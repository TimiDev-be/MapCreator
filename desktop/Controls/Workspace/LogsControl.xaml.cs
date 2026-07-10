using desktop.Classes;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

namespace desktop.Controls.Workspace
{
    /// <summary>
    /// Interaction logic for LogsControl.xaml
    /// </summary>
    public partial class LogsControl : UserControl
    {
        public LogsControl()
        {
            InitializeComponent();
            this.DataContext = this;
            App.AppDataContext.LogData.Logs.CollectionChanged += (s, e) =>
            {
                if (App.AppDataContext.LogData.Logs.Count > 0)
                {
                    ChangeButtonsVisibility(Visibility.Visible);
                } else
                {
                    ChangeButtonsVisibility(Visibility.Collapsed);
                }
            };
        }

        private async void LogsListBox_Loaded(object sender, RoutedEventArgs e)
        {
            this.LogsListBox.ItemsSource = App.AppDataContext.LogData.Logs;
            if (App.AppDataContext.LogData.Logs.Count > 0)
            {
                await SetActiveLog(App.AppDataContext.LogData.Logs.Last().Data.Id);
            }
        }
        private async void LogsRadioButton_Checked(object sender, RoutedEventArgs e)
        {
            var radioButton = (RadioButton)sender;
            if (radioButton is not null && radioButton.IsChecked == true)
            {
                Guid Id = Guid.Parse(radioButton.Tag.ToString() ?? "");
                await SetActiveLog(Id);
            }
        }
        private async Task SetActiveLog(Guid? Id)
        {
            var newActiveLog = App.AppDataContext.LogData.Logs.FirstOrDefault(l => l.Data.Id == Id);
            if (newActiveLog is null)
            {
                await new Log(LogStatus.Error, "Active log error", "Something went wrong while try to show log data.").Save();
                ShowLogData(null);
                return;
            }
            ShowLogData(newActiveLog.Data);
        }
        private void ShowLogData(Log? log)
        {
            if (log is null)
            {
                this.LogDescriptionTextBox.Text = string.Empty;
            } else
            {
                this.LogDescriptionTextBox.Text = log.Description;
            }
        }
        private void ClearLogsButton_Click(object sender, RoutedEventArgs e) 
        {
            App.LogService.ClearLogs();
            ShowLogData(null);
        }
        private void ChangeButtonsVisibility(Visibility visibility)
        {
            this.CopyLogButton.Visibility = visibility;
            this.ClearLogsButton.Visibility = visibility;
        }
        private void OpenLogsFolderButton_Click(object sender, RoutedEventArgs e)
        {
            string path = System.IO.Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "MapCreator",
                "logs"
            );
            Process.Start(new ProcessStartInfo(path) { UseShellExecute = true });
        }
        private void CopyLogButton_Click(object sender, RoutedEventArgs e)
        {
            Clipboard.SetText(this.LogDescriptionTextBox.Text);
        }
    }
}
