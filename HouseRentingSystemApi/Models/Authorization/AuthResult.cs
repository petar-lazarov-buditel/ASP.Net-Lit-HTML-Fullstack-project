using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;

namespace HouseRentingSystemApi.Models.Authorization
{
    // public class AuthResult
    // {
    //     public int Code { get; set; }
    //     public string Message { get; set; }

    //     public string Token { get; set; }
    // }

    public class AuthResult
    {
        public int Code { get; set; }
        public string Message { get; set; } = "";
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public string? Token { get; set; }
    }
}
