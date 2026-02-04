using EventAndDelegate.Events;

namespace EventAndDelegate.Service;

public class EmailService
{
    private readonly List<string> _sentEmails = new();

    public void HandleNotification(object? sender, NotificationEventArgs e)
    {
        string email = $"To: {e.Email} | Subject: {e.Subject} | Body: {e.Message}";
        _sentEmails.Add(email);
        Console.WriteLine($"Email sent: {email}");
    }

    public List<string> GetSentEmails() => new(_sentEmails);
}

