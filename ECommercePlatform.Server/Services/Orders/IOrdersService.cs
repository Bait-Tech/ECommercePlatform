using ECommercePlatform.Server.DTOs.Order;
using ECommercePlatform.Server.Extensions.pagination;

namespace ECommercePlatform.Server.Services.Orders
{
    public interface IOrdersService
    {
        Task<bool> Insert(OrderDTO orderDTO);
        Task<PaginatedResult<OrderDTO>> GetOrders(FilterOrdersDTO filterOrdersDTO);
        Task<bool> ApproveOrders(List<int> orderIds);
        Task<bool> DeleteOrders(List<int> orderIds);
    }
}
