using EventAndDelegate.Models;
using EventAndDelegate.Service;
using Microsoft.AspNetCore.Mvc;

namespace EventAndDelegate.Controllers;


// ============================================
// 4. MVC CONTROLLER
// ============================================

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly OrderService _orderService;
    private readonly LoggingService _loggingService;
    private readonly EmailService _emailService;
    private readonly InventoryMonitorService _inventoryMonitor;

    public OrdersController()
    {
        // Initialize services
        _orderService = new OrderService();
        _loggingService = new LoggingService();
        _emailService = new EmailService();
        _inventoryMonitor = new InventoryMonitorService();

        // Subscribe to events
        _orderService.OrderPlaced += _loggingService.HandleOrderPlaced;
        _orderService.StockChanged += _loggingService.HandleStockChanged;
        _orderService.StockChanged += _inventoryMonitor.HandleStockChanged;
        _orderService.NotificationRequired += _emailService.HandleNotification;
    }

    [HttpGet("products")]
    public ActionResult<List<Product>> GetProducts()
    {
        return Ok(_orderService.GetAllProducts());
    }

    [HttpGet("products/{id}")]
    public ActionResult<Product> GetProduct(int id)
    {
        var product = _orderService.GetProduct(id);
        if (product == null)
            return NotFound();

        return Ok(product);
    }

    [HttpPost("place")]
    public ActionResult<OrderResult> PlaceOrder([FromBody] OrderRequest request)
    {
        var result = _orderService.PlaceOrder(request);

        if (result.Success)
            return Ok(result);

        return BadRequest(result);
    }

    [HttpGet("logs")]
    public ActionResult<List<string>> GetLogs()
    {
        return Ok(_loggingService.GetLogs());
    }

    [HttpGet("emails")]
    public ActionResult<List<string>> GetSentEmails()
    {
        return Ok(_emailService.GetSentEmails());
    }
}
