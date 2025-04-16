using ECommercePlatform.Server.DTOs.HomePageSections;
using ECommercePlatform.Server.Services.HomePageCustomize.Hero;
using Microsoft.AspNetCore.Mvc;

namespace ECommercePlatform.Server.Controllers.HomePageControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroSectionController : ControllerBase
    {
        private readonly IHeroSectionService _heroSectionService;

        public HeroSectionController(IHeroSectionService heroSectionService)
        {
            _heroSectionService = heroSectionService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var sections = await _heroSectionService.Get();

            return Ok(sections);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromForm] HeroSectionDTO model)
        {
            var ID = await _heroSectionService.Insert(model);

            return Ok(ID);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm] HeroSectionDTO model)
        {
            var ID = await _heroSectionService.Update(model);

            return Ok(model);
        }
    }
}