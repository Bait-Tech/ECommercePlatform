using ECommercePlatform.Server.DTOs.Order;
using ECommercePlatform.Server.Services.Orders;
using Microsoft.AspNetCore.Mvc;

namespace ECommercePlatform.Server.Controllers.OrdersControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService _ordersService;
        public OrdersController(IOrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromBody] OrderDTO orderDTO)
        {
            var result = await _ordersService.Insert(orderDTO);
         
            return Ok(result);
        }

        [HttpPost("GetOrders")]
        public async Task<IActionResult> GetOrders([FromBody] FilterOrdersDTO filterOrdersDTO)
        {
            var result = await _ordersService.GetOrders(filterOrdersDTO);

            return Ok(result);
        }

        [HttpPost("Approve")]
        public async Task<IActionResult> ApproveOrders([FromBody] List<int> ordersIDs)
        {
            var result = await _ordersService.ApproveOrders(ordersIDs);

            return Ok(result);
        }


        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody] List<int> ordersIDs)
        {
            var result = await _ordersService.DeleteOrders(ordersIDs);

            return Ok(result);
        }
    }
}