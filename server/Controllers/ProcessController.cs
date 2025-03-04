using Microsoft.AspNetCore.Mvc;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProcessController : ControllerBase
    {
        private readonly ProcessService _service;

        public ProcessController(ProcessService service)
        {
            _service = service;
        }

        [HttpPost("start")]
        public async Task<IActionResult> StartProcess()
        {
            await _service.StartProcess();
            return Ok("Process Started");
        }

        [HttpGet("data")]
        public IActionResult GetProcessData()
        {
            var (isComplete, data) = _service.GetProcessData();

            if (!isComplete)
            {
                return BadRequest("Process has not completed yet");
            }

            return Ok(new { data });
        }
    }
}