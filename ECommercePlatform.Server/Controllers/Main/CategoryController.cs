﻿using ECommercePlatform.Server.Controllers.BaseControllers;
using ECommercePlatform.Server.DTOs.Category;
using ECommercePlatform.Server.Services.Main.Category;
using Microsoft.AspNetCore.Mvc;

namespace ECommercePlatform.Server.Controllers.Main
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseCrudController<Entities.Main.Category>
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService) : base(categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost("Category")]
        public async Task<IActionResult> CreateCategory([FromForm] CategoryDTO categoryDto)
        {
            int result = await _categoryService.InsertAsync(categoryDto);

            if (result > 0)
            {
                return Ok(result);
            }

            return BadRequest(new { Message = "Failed to create category" });
        }

        [HttpPut("Category")]
        public async Task<IActionResult> UpdateCategory([FromForm] CategoryDTO categoryDto)
        {
            var result = await _categoryService.UpdateAsync(categoryDto);

            if (result)
            {
                return Ok();
            }

            return BadRequest(new { Message = "Failed to update category" });
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _categoryService.GetAllCategories();

            return Ok(result);
        }

        [HttpDelete("List")]
        public async Task<IActionResult> DeleteList(List<int> ids)
        {
            var result = await _categoryService.DeleteListAsync(ids);

            return result ? Ok() : BadRequest();
        }

    }
}
