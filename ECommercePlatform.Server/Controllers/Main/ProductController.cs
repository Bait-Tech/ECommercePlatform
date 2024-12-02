using ECommercePlatform.Server.Controllers.BaseControllers;
using ECommercePlatform.Server.DTOs.Category;
using ECommercePlatform.Server.DTOs.Product;
using ECommercePlatform.Server.Extensions.pagination;
using ECommercePlatform.Server.Services.Main.Product;
using Microsoft.AspNetCore.Mvc;

namespace ECommercePlatform.Server.Controllers.Main
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseCrudController<Entities.Main.Product>
    {
        private readonly IProductService _productSerivce;

        public ProductController(IProductService productService) : base(productService)
        {
            _productSerivce = productService;
        }

        [HttpPost("Product")]
        public async Task<IActionResult> CreateProduct([FromForm] ProductDTO productDto)
        {
            int result = await _productSerivce.InsertAsync(productDto);

            if (result > 0)
            {
                return Ok(result);
            }

            return BadRequest(new { Message = "Failed to create Product" });
        }

        [HttpPut("Product")]
        public async Task<IActionResult> UpdateProduct([FromForm] ProductDTO productDto)
        {
            var result = await _productSerivce.UpdateAsync(productDto);

            if (result)
            {
                return Ok();
            }

            return BadRequest(new { Message = "Failed to update product" });
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _productSerivce.GetAllAsync();

            return Ok(result);
        }

        [HttpGet("Paged/Products")]
        public async Task<IActionResult> GetPaged([FromQuery] PaginationParams paginationParams)
        {
            var result = await _productSerivce.GetPaginatedResultAsync(paginationParams);
            return Ok(result);
        }


        [HttpDelete("List")]
        public async Task<IActionResult> DeleteList(List<int> ids)
        {
            var result = await _productSerivce.DeleteListAsync(ids);

            return result ? Ok() : BadRequest();
        }
    }
}
