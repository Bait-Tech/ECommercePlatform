﻿namespace ECommercePlatform.Server.Models.Admin
{
    public class ChangePasswordModel
    {
        public string ID { get; set; } = string.Empty;
        public string OldPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
