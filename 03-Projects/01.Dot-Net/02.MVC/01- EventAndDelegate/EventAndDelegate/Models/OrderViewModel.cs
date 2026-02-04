namespace EventAndDelegate.Models;

// ============================================
// Data Annotations for ViewModels
// ============================================

using System.ComponentModel.DataAnnotations;

public record OrderViewModel
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string CustomerEmail { get; init; } = string.Empty;

    [Required(ErrorMessage = "Please select a product")]
    [Range(1, int.MaxValue, ErrorMessage = "Please select a valid product")]
    public int ProductId { get; init; }

    [Required(ErrorMessage = "Quantity is required")]
    [Range(1, 100, ErrorMessage = "Quantity must be between 1 and 100")]
    public int Quantity { get; init; }
}
