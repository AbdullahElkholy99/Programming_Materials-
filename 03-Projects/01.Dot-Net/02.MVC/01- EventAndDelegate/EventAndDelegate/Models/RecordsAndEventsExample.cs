namespace EventAndDelegate.Models;
// ============================================
// RECORDS AND EVENTS IN C# MVC PROJECT
// ============================================

// ============================================
// 1. RECORDS - Immutable data models
// ============================================

// Product record - immutable data structure
public record Product(int Id, string Name, decimal Price, int Stock)
{
    // Computed property
    public bool IsInStock => Stock > 0;
}

// Order record with validation
public record OrderRequest(int ProductId, int Quantity, string CustomerEmail)
{
    // Validation method
    public bool IsValid() => Quantity > 0 && !string.IsNullOrEmpty(CustomerEmail);
}

// Order result record
public record OrderResult(bool Success, string Message, int? OrderId = null);



// ============================================
// 6. USAGE EXAMPLE / DEMO
// ============================================

//public class Demo
//{
//    public static void RunExample()
//    {
//        Console.WriteLine("=== Records and Events Example ===\n");

//        // Create services
//        var orderService = new OrderService();
//        var loggingService = new LoggingService();
//        var emailService = new EmailService();
//        var inventoryMonitor = new InventoryMonitorService();

//        // Subscribe to events
//        orderService.OrderPlaced += loggingService.HandleOrderPlaced;
//        orderService.StockChanged += loggingService.HandleStockChanged;
//        orderService.StockChanged += inventoryMonitor.HandleStockChanged;
//        orderService.NotificationRequired += emailService.HandleNotification;

//        // Display products
//        Console.WriteLine("Available Products:");
//        foreach (var product in orderService.GetAllProducts())
//        {
//            Console.WriteLine($"  {product.Id}. {product.Name} - ${product.Price} (Stock: {product.Stock})");
//        }
//        Console.WriteLine();

//        // Place orders
//        Console.WriteLine("Placing Orders:\n");
        
//        var order1 = new OrderRequest(1, 2, "customer1@example.com");
//        var result1 = orderService.PlaceOrder(order1);
//        Console.WriteLine($"Order 1 Result: {result1.Message}\n");

//        var order2 = new OrderRequest(2, 8, "customer2@example.com");
//        var result2 = orderService.PlaceOrder(order2);
//        Console.WriteLine($"Order 2 Result: {result2.Message}\n");

//        // Try ordering out of stock item
//        var order3 = new OrderRequest(3, 1, "customer3@example.com");
//        var result3 = orderService.PlaceOrder(order3);
//        Console.WriteLine($"Order 3 Result: {result3.Message}\n");

//        // Display logs
//        Console.WriteLine("\n=== All Logs ===");
//        foreach (var log in loggingService.GetLogs())
//        {
//            Console.WriteLine(log);
//        }

//        Console.WriteLine("\n=== Sent Emails ===");
//        foreach (var email in emailService.GetSentEmails())
//        {
//            Console.WriteLine(email);
//        }
//    }
//}
