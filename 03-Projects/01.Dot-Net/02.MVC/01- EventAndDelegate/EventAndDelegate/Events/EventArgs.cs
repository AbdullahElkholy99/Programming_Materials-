namespace EventAndDelegate.Events;
// Event data records
public record OrderPlacedEventArgs(int OrderId, int ProductId, int Quantity, DateTime OrderDate);
public record StockChangedEventArgs(int ProductId, int OldStock, int NewStock, DateTime ChangedDate);
public record NotificationEventArgs(string Email, string Subject, string Message);
