using ECommercePlatform.Server.DTOs.HomePageSections;
using ECommercePlatform.Server.Services.HomePageCustomize.Products;
using Microsoft.AspNetCore.Mvc;

namespace ECommercePlatform.Server.Controllers.HomePageControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSectionsController : ControllerBase
    {
        private readonly IProductsSectionService _productsSectionService;

        public ProductSectionsController(IProductsSectionService productsSectionService)
        {
            _productsSectionService = productsSectionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sections = await _productsSectionService.GetAll();

            return Ok(sections);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromBody] ProductSectionDTO model)
        {
            var ID = await _productsSectionService.Insert(model);

            return Ok(ID);
        }

        [HttpPut]
        public async Task<IActionResult> Update(ProductSectionDTO model)
        {
            var ID = await _productsSectionService.Update(model);

            return Ok(ID);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int ID)
        {
            var result = await _productsSectionService.Delete(ID);

            return Ok(result);
        }
    }
}
