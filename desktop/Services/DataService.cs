using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Windows;
using desktop.Data;
using desktop.Data.Models;
using desktop.Errors;

namespace desktop.Services
{
    public class DataService(AppDataContext dataContext)
    {
        private static readonly string DataFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "data.json"
        );
        private readonly AppDataContext _dataContext = dataContext;
        private static readonly SemaphoreSlim _fileLock = new SemaphoreSlim(1, 1);

        public async Task<AppData> GetData()
        {
            return _dataContext.AppData;
        }
        public async Task<MMap?> NewMap(string Name)
        {
            if (string.IsNullOrEmpty(Name.Trim()))
                throw new AEMapNameRequired();

            MMap newMap = new(Name);
            _dataContext.AppData.Source.Maps.Add(newMap);
            await this.Save();

            return newMap;
        }
        public async Task<MTemplate?> NewTemplate(string HtmlContent)
        {
            if (string.IsNullOrEmpty(HtmlContent.Trim()))
                throw new AETemplateBodyRequired();

            MTemplate newTemplate = new(HtmlContent);
            _dataContext.AppData.Source.Templates.Add(newTemplate);
            await this.Save();

            return newTemplate;
        }
        public List<MTemplate> GetTemplates()
        {
            return _dataContext.AppData.Source.Templates;
        }
        public List<MMap> GetMaps()
        {
            return _dataContext.AppData.Source.Maps;
        }
        public MTemplate? GetTemplate(Guid Id)
        {
            return _dataContext.AppData.Source.Templates.FirstOrDefault(t => t.Id == Id);
        } 
        public MMap? GetMap(Guid Id)
        {
            return _dataContext.AppData.Source.Maps.FirstOrDefault(m => m.Id == Id);
        } 
        public async Task UpdateTemplate(Guid id, MTemplate template)
        {
            var existingTemplate = _dataContext.AppData.Source.Templates.FirstOrDefault(t => t.Id == id);
            if (existingTemplate is null) throw new AETemplateNotFound();

            existingTemplate.Name = template.Name;
            // functionality related to update html content strict in app is not there
            // existingTemplate.HtmlContent = template.HtmlContent;
            await this.Save();
        }
        public async Task UpdateMap(Guid id, MMap map)
        {
            var existingMap = _dataContext.AppData.Source.Maps.FirstOrDefault(m => m.Id == id);
            if (existingMap is null) throw new AEMapNotFound();

            existingMap.Name = map.Name;
            existingMap.Groups = map.Groups;
            existingMap.Features = map.Features;
            existingMap.Description = map.Description;
            existingMap.AttractionPoint = map.AttractionPoint;
            existingMap.AreaForPrint = map.AreaForPrint;
            existingMap.PrintSettings = map.PrintSettings;
            existingMap.DisabledLayers = map.DisabledLayers;
            existingMap.UpdatedAt = DateTime.UtcNow;

            await this.Save();
        }
        public async Task DeleteTemplate(Guid id)
        {
            var template = this.GetTemplate(id);
            if (template is null) return;

            if (_dataContext.AppData.Source.Maps.Any(m => m.Description.TemplateId == id))
                throw new AETemplateInUse();

            _dataContext.AppData.Source.Templates.Remove(template);
            await this.Save();

            return;
        }
        public async Task DeleteMap(Guid id)
        {
            var map = this.GetMap(id);
            if (map is null) return;

            _dataContext.AppData.Source.Maps.Remove(map);
            await this.Save();

            return;
        }
        public async Task DeleteBunchMaps(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var map = _dataContext.AppData.Source.Maps.FirstOrDefault(x => x.Id == id);
                if (map is null) continue;
                _dataContext.AppData.Source.Maps.Remove(map);
            }
            await this.Save();
        }
        public MSource GetSource()
        {
            return _dataContext.AppData.Source;
        }
        public async Task ImportData(MSource mSource)
        {
            _dataContext.AppData.Source = mSource;
            await this.Save();
        }
        private async Task Save()
        {
            await _fileLock.WaitAsync();
            try
            {
                var json = JsonSerializer.Serialize(_dataContext.AppData.Source, _dataContext.AppJsonSerializerOptions);
                await File.WriteAllTextAsync(DataFilePath, json);
            }
            finally
            {
                _fileLock.Release();
            }
        }
    }
}
