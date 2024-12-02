using ECommercePlatform.Server.Extensions.pagination;
using ECommercePlatform.Server.Services.Base.Crud;
using Microsoft.AspNetCore.Mvc;

namespace ECommercePlatform.Server.Controllers.BaseControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseCrudController<T> : ControllerBase where T : class
    {
        protected readonly ICrudService<T> _service;

        protected BaseCrudController(ICrudService<T> service)
        {
            _service = service;
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<T>>> GetAll()
        {
            var entities = await _service.GetAllAsync();
            return Ok(entities);
        }

        [HttpGet("Paged")]
        public async Task<IActionResult> GetAllPagedAsync([FromQuery] PaginationParams paginationParams)
        {
            var result = await _service.GetAllPagedAsync(paginationParams);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<T>> GetById(int id)
        {
            var entity = await _service.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            return Ok(entity);
        }

        [HttpPost]
        public virtual async Task<ActionResult> Create(T entity)
        {
            await _service.AddAsync(entity);

            if (entity == null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        [HttpPut("{id}")]
        public virtual async Task<ActionResult> Update(int id, T entity)
        {
            if (id != (int)entity.GetType().GetProperty("ID").GetValue(entity))
            {
                return BadRequest();
            }
            await _service.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
