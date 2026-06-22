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
        private string _url = string.Empty;
        public SetupUrlControl()
        {
            InitializeComponent();
        }
        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            CloseSetupUrlClicked?.Invoke(this, EventArgs.Empty);
        }

        private void SaveUrlButton_Click(object sender, RoutedEventArgs e)
        {
            SaveUrlButton_Click();
        }

        private async Task SaveUrlButton_Click()
        {
            if (!string.IsNullOrEmpty(_url))
            {
                UrlService urlService = new UrlService();
                await urlService.Save(new UrlData(_url));
                CloseSetupUrlClicked?.Invoke(this, EventArgs.Empty);
            }
        }

        private void UrlTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            var urlTextBox = (TextBox)sender;
            _url = urlTextBox.Text;

            if (string.IsNullOrEmpty(urlTextBox.Text))
            {
                ShowError("Url is required.");
            }
            else
            {
                CloseError();
            }
        }

        private void ShowError(string message)
        {
            this.UrlTextBoxErrorContainer.Visibility = Visibility.Visible;
            this.UrlTextBoxErrorMessage.Text = message;
        }

        private void CloseError()
        {
            this.UrlTextBoxErrorContainer.Visibility = Visibility.Collapsed;
            this.UrlTextBoxErrorMessage.Text = string.Empty;
        }
    }
}
