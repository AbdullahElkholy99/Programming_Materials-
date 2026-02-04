using EventAndDelegate.Events;

namespace EventAndDelegate.Service;

public class InventoryMonitorService
{
    public void HandleStockChanged(object? sender, StockChangedEventArgs e)
    {
        if (e.NewStock < 5)
        {
            Console.WriteLine($"⚠ WARNING: Low stock alert for Product #{e.ProductId}! Current stock: {e.NewStock}");
        }
    }
}

