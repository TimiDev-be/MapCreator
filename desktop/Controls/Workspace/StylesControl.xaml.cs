using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
using desktop.Classes;
using desktop.Events;

namespace desktop.Controls.Workspace
{
    /// <summary>
    /// Interaction logic for StylesControl.xaml
    /// </summary>
    public partial class StylesControl : UserControl
    {
        public event RoutedEventHandler OpenAddStylePopup
        {
            add => AddHandler(AppEvents.OpenAddStylePopupEvent, value);
            remove => RemoveHandler(AppEvents.OpenAddStylePopupEvent, value);
        }
        public event RoutedEventHandler OpenChangeStylePopup
        {
            add => AddHandler(AppEvents.OpenChangeStylePopupEvent, value);
            remove => RemoveHandler(AppEvents.OpenChangeStylePopupEvent, value);
        }
        public event RoutedEventHandler ReloadWebView
        {
            add => AddHandler(AppEvents.ReloadWebViewEvent, value);
            remove => RemoveHandler(AppEvents.ReloadWebViewEvent, value);
        }
        public StylesControl()
        {
            InitializeComponent();
        }

        private void StylesList_Loaded(object sender, RoutedEventArgs e)
        {
            StylesList.ItemsSource = App.AppDataContext.StyleData.Styles;
        }
        private void ShowAddNewStyleButton_Click(object sender, RoutedEventArgs e)
        {
            RaiseEvent(new RoutedEventArgs(AppEvents.OpenAddStylePopupEvent));
        }
        private void ShowChangeStyleButton_Click(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;
            if (button is null) return;

            var id = Guid.Parse(button.Tag.ToString() ?? "");
            var style = App.AppDataContext.StyleData.Styles.FirstOrDefault(s => s.Id == id);

            if (style is null) return;

            RaiseEvent(new StyleRoutedEventArgs(AppEvents.OpenChangeStylePopupEvent, style));
        }
        private async void StyleItem_Click(object sender, RoutedEventArgs e)
        {
            var listBox = (ListBox)sender;
            if (listBox.SelectedItem is desktop.Classes.Style style)
            {
                var isReload = await App.StyleService.ToggleActiveStyle(style.Id);
                if (isReload) RaiseEvent(new RoutedEventArgs(AppEvents.ReloadWebViewEvent));
            }
        }
        private async void DeleteItem_Click(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;
            var id = (Guid)button.Tag;
            if (App.AppDataContext.StyleData.Styles.FirstOrDefault(s => s.Id == id)?.IsActive == true)
            {
                await App.StyleService.DeleteStyle(id);
                RaiseEvent(new RoutedEventArgs(AppEvents.ReloadWebViewEvent));
                return;
            }
            await App.StyleService.DeleteStyle(id);
        }
    }
}
