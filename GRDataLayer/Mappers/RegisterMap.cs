using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataModel;

namespace GRDataLayer.Mappers
{
    public class RegisterMap : EntityTypeConfiguration<RepRegister>
    {
        public RegisterMap()
        {
            this.ToTable("RepRegister");
            this.Property(t => t.RepRegisterId).HasColumnName("RepRegisterId");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.Mobile).HasColumnName("Mobile");
        }
    }
}
