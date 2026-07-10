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
        private string _name { get; set; }
        private string _url { get; set; }
        public SetupUrlControl()
        {
            InitializeComponent();
        }
        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            this.ClearData();
            this.Visibility = Visibility.Collapsed;
        }

        private async void AddStyleButton_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(_url) && !string.IsNullOrEmpty(_name))
            {
                desktop.Classes.Style style = new desktop.Classes.Style(_name, _url);
                await App.StyleService.AddStyle(style);
                this.ClearData();
                this.Visibility = Visibility.Collapsed;
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
        private void NameTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            var nameTextBox = (TextBox)sender;
            _name = nameTextBox.Text;

            if (string.IsNullOrEmpty(_name))
            {
                ShowError("Name is required.", this.NameTextBoxErrorContainer, this.NameTextBoxErrorMessage);
            }
            else
            {
                CloseError(this.NameTextBoxErrorContainer, this.NameTextBoxErrorMessage);
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

        private void ClearData()
        {
            this.NameTextBox.Text = string.Empty;
            this.UrlTextBox.Text = string.Empty;
            CloseError(this.NameTextBoxErrorContainer, this.NameTextBoxErrorMessage);
            CloseError(this.UrlTextBoxErrorContainer, this.UrlTextBoxErrorMessage);
        }
    }
}
