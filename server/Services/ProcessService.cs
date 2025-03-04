using Microsoft.AspNetCore.SignalR;
using Backend.Hubs;
using Backend.Helpers;

namespace Backend.Services
{
    public class ProcessService
    {
        private readonly IHubContext<ProcessHub> _hubContext;
        private readonly ILogger<ProcessService> _logger;
        private string _generatedData;
        private bool _isProcessComplete;

        public ProcessService(IHubContext<ProcessHub> hubContext, ILogger<ProcessService> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
            _isProcessComplete = false;
            _generatedData = string.Empty;

        }

        public async Task StartProcess()
        {
            _isProcessComplete = false;
            Random random = new();

            for (int i = 1; i <= 100; i++)
            {
                if (i == 100)
                {
                    _generatedData = HelperMethods.GenerateRandomData();
                    _isProcessComplete = true;
                }
                await _hubContext.Clients.All.SendAsync("ReceiveProgress", i);
                if (i < 100) await Task.Delay(random.Next(50, 100));
            }
            _logger.LogInformation("Process completed. Data generated");
        }

        public (bool isComplete, string data) GetProcessData()
        {
            _logger.LogInformation("Getting process data...");
            return (_isProcessComplete, _generatedData);
        }

    }


}
