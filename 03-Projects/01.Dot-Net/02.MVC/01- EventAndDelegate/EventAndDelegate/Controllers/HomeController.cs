// ============================================
// HomeController.cs - MVC Controller with Views
// ============================================

using EventAndDelegate.Models;
using EventAndDelegate.Service;
using Microsoft.AspNetCore.Mvc;

namespace EventAndDelegate.Controllers;

public class HomeController : Controller
{
    private readonly OrderService _orderService;
    private readonly LoggingService _loggingService;
    private readonly EmailService _emailService;

    // Dependency Injection
    public HomeController(
        OrderService orderService, 
        LoggingService loggingService,
        EmailService emailService)
    {
        _orderService = orderService;
        _loggingService = loggingService;
        _emailService = emailService;
    }

    // GET: /Home/Index
    public IActionResult Index()
    {
        var products = _orderService.GetAllProducts();
        var viewModels = products
            .Select(p => ProductViewModel.FromProduct(p))
            .ToList();
        
        return View(viewModels);
    }

    // GET: /Home/ProductDetails/5
    public IActionResult ProductDetails(int id)
    {
        var product = _orderService.GetProduct(id);
        if (product == null)
        {
            return NotFound();
        }

        var viewModel = ProductViewModel.FromProduct(product);
        return View(viewModel);
    }

    // GET: /Home/PlaceOrder
    public IActionResult PlaceOrder()
    {
        ViewBag.Products = _orderService.GetAllProducts();
        return View();
    }

    // POST: /Home/PlaceOrder
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult PlaceOrder(OrderViewModel model)
    {
        if (!ModelState.IsValid)
        {
            ViewBag.Products = _orderService.GetAllProducts();
            return View(model);
        }

        var request = new OrderRequest(
            model.ProductId, 
            model.Quantity, 
            model.CustomerEmail
        );

        var result = _orderService.PlaceOrder(request);

        if (result.Success)
        {
            TempData["SuccessMessage"] = result.Message;
            TempData["OrderId"] = result.OrderId;
            return RedirectToAction(nameof(OrderConfirmation), new { id = result.OrderId });
        }

        ViewBag.Products = _orderService.GetAllProducts();
        ModelState.AddModelError("", result.Message);
        return View(model);
    }

    // GET: /Home/OrderConfirmation/5
    public IActionResult OrderConfirmation(int id)
    {
        ViewBag.OrderId = id;
        return View();
    }

    // GET: /Home/Logs
    public IActionResult Logs()
    {
        var logs = _loggingService.GetLogs();
        return View(logs);
    }

    // GET: /Home/Emails
    public IActionResult Emails()
    {
        var emails = _emailService.GetSentEmails();
        return View(emails);
    }
}
