using EventAndDelegate.Service;

namespace EventAndDelegate.Events;
// ============================================
// Event Subscription Manager
// ============================================

public class EventSubscriptionManager
{
    public void Initialize(
        OrderService orderService,
        LoggingService loggingService,
        EmailService emailService,
        InventoryMonitorService inventoryMonitor)
    {
        // Subscribe to events
        orderService.OrderPlaced += loggingService.HandleOrderPlaced;
        orderService.StockChanged += loggingService.HandleStockChanged;
        orderService.StockChanged += inventoryMonitor.HandleStockChanged;
        orderService.NotificationRequired += emailService.HandleNotification;

        Console.WriteLine("Event subscriptions initialized successfully.");
    }
}
