
namespace EventAndDelegate.Models;

// ============================================
// 5. VIEW MODELS (using records)
// ============================================

public record ProductViewModel(int Id, string Name, string Price, string StockStatus)
{
    public static ProductViewModel FromProduct(Product product)
    {
        return new ProductViewModel(
            product.Id,
            product.Name,
            $"${product.Price:F2}",
            product.IsInStock ? $"{product.Stock} in stock" : "Out of stock"
        );
    }
}


