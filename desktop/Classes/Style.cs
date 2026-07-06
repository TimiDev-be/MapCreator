using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace desktop.Classes
{
    public class Style(string Name, string Url) : INotifyPropertyChanged
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = Name;
        public string Url { get; set; } = Url;
        private bool _isActive { get; set; } = false;
        public bool IsActive
        {
            get => _isActive;
            set
            {
                _isActive = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsActive)));
            }

        }
        public event PropertyChangedEventHandler? PropertyChanged;
    }
}
