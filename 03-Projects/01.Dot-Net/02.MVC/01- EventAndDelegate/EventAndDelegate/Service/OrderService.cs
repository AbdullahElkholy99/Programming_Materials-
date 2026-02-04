using EventAndDelegate.Events;
using EventAndDelegate.Models;

namespace EventAndDelegate.Service;

// ============================================
// 2. EVENT PUBLISHER - Service with events
// ============================================

public class OrderService
{
    // Define events using EventHandler with custom EventArgs
    public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
    public event EventHandler<StockChangedEventArgs>? StockChanged;
    public event EventHandler<NotificationEventArgs>? NotificationRequired;

    private readonly List<Product> _products;
    private int _nextOrderId = 1;

    public OrderService()
    {
        // Sample data
        _products = new List<Product>
        {
            new Product(1, "Laptop", 999.99m, 10),
            new Product(2, "Mouse", 29.99m, 50),
            new Product(3, "Keyboard", 79.99m, 0)
        };
    }

    public OrderResult PlaceOrder(OrderRequest request)
    {
        if (!request.IsValid())
        {
            return new OrderResult(false, "Invalid order request");
        }

        var product = _products.Find(p => p.Id == request.ProductId);
       
        if (product == null)
        {
            return new OrderResult(false, "Product not found");
        }

        if (product.Stock < request.Quantity)
        {
            return new OrderResult(false, "Insufficient stock");
        }

        // Update stock
        int oldStock = product.Stock;
        var updatedProduct = product with { Stock = product.Stock - request.Quantity };
        int index = _products.FindIndex(p => p.Id == request.ProductId);
        _products[index] = updatedProduct;

        int orderId = _nextOrderId++;

        // Raise events
        OnOrderPlaced(new OrderPlacedEventArgs(orderId, product.Id, request.Quantity, DateTime.Now));
        OnStockChanged(new StockChangedEventArgs(product.Id, oldStock, updatedProduct.Stock, DateTime.Now));
        OnNotificationRequired(new NotificationEventArgs(
            request.CustomerEmail,
            "Order Confirmation",
            $"Your order #{orderId} for {request.Quantity}x {product.Name} has been placed successfully."
        ));

        return new OrderResult(true, "Order placed successfully", orderId);
    }

    public Product? GetProduct(int id) => _products.Find(p => p.Id == id);
    public List<Product> GetAllProducts() => new List<Product>(_products);

    // Protected methods to raise events
    protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
    {
        OrderPlaced?.Invoke(this, e);
    }

    protected virtual void OnStockChanged(StockChangedEventArgs e)
    {
        StockChanged?.Invoke(this, e);
    }

    protected virtual void OnNotificationRequired(NotificationEventArgs e)
    {
        NotificationRequired?.Invoke(this, e);
    }
}

