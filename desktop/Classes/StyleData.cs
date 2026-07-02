using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Text.Json.Serialization;

namespace desktop.Classes
{
    public class StyleData
    {
        [JsonPropertyName("styles")]
        public ObservableCollection<Style> Styles { get; set; } = [];
        public StyleData()
        {
            
        }
        public StyleData(List<Style> Styles)
        {
            this.Styles = new ObservableCollection<Style>(Styles);
        }
    }
}
