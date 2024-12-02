using ECommercePlatform.Server.Controllers.BaseControllers;
using ECommercePlatform.Server.Services.Main.SubCategory;
using Microsoft.AspNetCore.Mvc;

namespace ECommercePlatform.Server.Controllers.Main
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryController : BaseCrudController<Entities.Main.SubCategory>
    {
        private readonly ISubCategoryService _subCategoryService;

        public SubCategoryController(ISubCategoryService subCategoryService) : base(subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpGet("SubCategories")]
        public async Task<IActionResult> GetByCategoryId([FromQuery] int categoryID)
        {
            var result = await _subCategoryService.GetByCategoryId(categoryID);
            return Ok(result);
        }

        [HttpDelete("List")]
        public async Task<IActionResult> DeleteList(List<int> ids)
        {
            var result = await _subCategoryService.DeleteListAsync(ids);

            return result ? Ok() : BadRequest();
        }
    }
}
