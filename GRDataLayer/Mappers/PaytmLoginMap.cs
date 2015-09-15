using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataModel;
namespace GRDataLayer.Mappers
{
    public class PaytmLoginMap : EntityTypeConfiguration<PaytmLogin>
    {
        public PaytmLoginMap()
        {
            this.ToTable("PaytmLogin");
            this.HasKey(t => t.UserName);
            this.Property(t => t.UserName).HasColumnName("UserName");
            this.Property(t => t.Password).HasColumnName("Password");
            this.Property(t => t.Status).HasColumnName("Status");
        }
    }
}
