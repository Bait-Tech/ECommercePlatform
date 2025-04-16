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


        [HttpGet("{id}")]
        public override async Task<ActionResult<Entities.Main.Product>> GetById(int id)
        {
            var result = await _productSerivce.GetByID(id);
            return Ok(result);
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

        [HttpGet("ProductsByCategory")]
        public async Task<IActionResult> GetProductsByCategory(int categoryID , int? subCategoryID)
        {
            var result = await _productSerivce.GetProductsByCategory(categoryID, subCategoryID);

            return Ok(result);
        }


        [HttpPost("FilterProducts")]
        public async Task<IActionResult> FilterProducts([FromBody]FilterProductsDTO filterProductsDTO)
        {
            var result = await _productSerivce.FilterProducts(filterProductsDTO);

            return Ok(result);
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

        [HttpDelete("List")]
        public async Task<IActionResult> DeleteList(List<int> ids)
        {
            var result = await _productSerivce.DeleteListAsync(ids);

            return result ? Ok() : BadRequest();
        }
    }
}
