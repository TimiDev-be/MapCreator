using desktop.Services;
using desktop.Classes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace desktop.Controls
{
    /// <summary>
    /// Logika interakcji dla klasy SetupUrlControl.xaml
    /// </summary>
    public partial class SetupUrlControl : UserControl
    {
        public EventHandler? CloseSetupUrlClicked;
        public EventHandler? SaveSetupUrlClicked;
        private string _name = string.Empty;
        private string _url = string.Empty;
        public SetupUrlControl()
        {
            InitializeComponent();
        }
        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            CloseSetupUrlClicked?.Invoke(this, EventArgs.Empty);
        }

        private async void AddUrlButton_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(_url) && !string.IsNullOrEmpty(_name))
            {
                UrlService urlService = new UrlService();
                await urlService.Save(new UrlData(_url));
                SaveSetupUrlClicked?.Invoke(this, EventArgs.Empty);
            }
        }

        private void UrlTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            var urlTextBox = (TextBox)sender;
            _url = urlTextBox.Text;

            if (string.IsNullOrEmpty(urlTextBox.Text))
            {
                ShowError("Url is required.", this.UrlTextBoxErrorContainer, this.UrlTextBoxErrorMessage);
            }
            else
            {
                CloseError(this.UrlTextBoxErrorContainer, this.UrlTextBoxErrorMessage);
            }
        }
        private void UrlNameTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            var urlTextBox = (TextBox)sender;
            _url = urlTextBox.Text;

            if (string.IsNullOrEmpty(urlTextBox.Text))
            {
                ShowError("Name is required.", this.UrlNameTextBoxErrorContainer, this.UrlNameTextBoxErrorMessage);
            }
            else
            {
                CloseError(this.UrlNameTextBoxErrorContainer, this.UrlNameTextBoxErrorMessage);
            }
        }

        private void ShowError(string message, Border? ErrorContainer, TextBlock? ErrorTextBlock)
        {
            if (ErrorContainer is null || ErrorTextBlock is null) return;

            ErrorContainer.Visibility = Visibility.Visible;
            ErrorTextBlock.Text = message;
        }

        private void CloseError(Border? ErrorContainer, TextBlock? ErrorTextBlock)
        {
            if (ErrorContainer is null || ErrorTextBlock is null) return;

            ErrorContainer.Visibility = Visibility.Collapsed;
            ErrorTextBlock.Text = string.Empty;
        }
    }
}
