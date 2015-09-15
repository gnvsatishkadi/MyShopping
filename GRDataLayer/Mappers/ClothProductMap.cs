using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataModel;
using System.Data.Entity.ModelConfiguration;

namespace GRDataLayer.Mappers
{
    public class ClothProductMap : EntityTypeConfiguration<ClothProducts>
    {
        public ClothProductMap()
        {
            //Table Name
            this.ToTable("ClothProduct");

            //Properties
            this.HasKey(t => t.ProductId);

            //Table Mapping
            this.Property(t => t.ProductId).HasColumnName("ProductId");
            this.Property(t => t.ProductType).HasColumnName("ProductType");
            this.Property(t => t.Category).HasColumnName("Category");
            this.Property(t => t.Material).HasColumnName("Material");
            this.Property(t => t.ProductGender).HasColumnName("ProductGender");
            this.Property(t => t.ProductBrand).HasColumnName("ProductBrand");
            this.Property(t => t.ProductColor).HasColumnName("ProductColor");
            this.Property(t => t.NeckType).HasColumnName("NeckType");
            this.Property(t => t.Sleves).HasColumnName("Sleves");
            this.Property(t => t.Fit).HasColumnName("Fit");
            this.Property(t => t.ClothPath).HasColumnName("ClothPath");
            this.Property(t => t.Price).HasColumnName("Price");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.AddDate).HasColumnName("AddDate");
            this.Property(t => t.ModifyDate).HasColumnName("ModifyDate");
            this.Property(t => t.AddedBy).HasColumnName("AddedBy");
        }
    }
}
