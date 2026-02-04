using EventAndDelegate.Events;

namespace EventAndDelegate.Service;
// ============================================
// 3. EVENT SUBSCRIBERS - Services that handle events
// ============================================

public class LoggingService
{
    private readonly List<string> _logs = new();

    public void HandleOrderPlaced(object? sender, OrderPlacedEventArgs e)
    {
        string log = $"[{e.OrderDate:yyyy-MM-dd HH:mm:ss}] Order #{e.OrderId} placed: ProductId={e.ProductId}, Quantity={e.Quantity}";
        _logs.Add(log);
        Console.WriteLine(log);
    }

    public void HandleStockChanged(object? sender, StockChangedEventArgs e)
    {
        string log = $"[{e.ChangedDate:yyyy-MM-dd HH:mm:ss}] Stock changed for Product #{e.ProductId}: {e.OldStock} → {e.NewStock}";
        _logs.Add(log);
        Console.WriteLine(log);
    }

    public List<string> GetLogs() => new(_logs);
}

