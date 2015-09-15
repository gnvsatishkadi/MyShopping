using GRDataModel;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataLayer.Mappers
{

    //SizeClothMap
    public class SizeClothMap : EntityTypeConfiguration<SizeCloth>
    {
        public SizeClothMap()
        {
            this.ToTable("SizeCloth");
            this.HasKey(t => t.SizeId);

            this.Property(t => t.SizeId).HasColumnName("SizeId");
            this.Property(t => t.Size).HasColumnName("Size");
        }
    }

    //BrandClothMap
    public class BrandClothMap : EntityTypeConfiguration<BrandCloth>
    {
        public BrandClothMap()
        {
            this.ToTable("BrandCloth");
            this.HasKey(t => t.BrandId);

            this.Property(t => t.BrandId).HasColumnName("BrandId");
            this.Property(t => t.BrandName).HasColumnName("BrandName");
        }
    }

    //NecktypeClothMap
    public class NecktypeClothMap : EntityTypeConfiguration<NecktypeCloth>
    {
        public NecktypeClothMap()
        {
            this.ToTable("NecktypeCloth");
            this.HasKey(t => t.NeckId);

            this.Property(t => t.NeckId).HasColumnName("NeckId");
            this.Property(t => t.NeckType).HasColumnName("NeckType");
        }
    }

    //SleevesClothMap
    public class SleevesClothMap : EntityTypeConfiguration<SleevesCloth>
    {
        public SleevesClothMap()
        {
            this.ToTable("SleevesCloth");
            this.HasKey(t => t.SlevesId);

            this.Property(t => t.SlevesId).HasColumnName("SlevesId");
            this.Property(t => t.SlevesType).HasColumnName("SlevesType");
        }
    }

    //FitClothMap
    public class FitClothMap : EntityTypeConfiguration<FitCloth>
    {
        public FitClothMap()
        {
            this.ToTable("FitCloth");
            this.HasKey(t => t.FitId);

            this.Property(t => t.FitId).HasColumnName("FitId");
            this.Property(t => t.FitType).HasColumnName("FitType");
        }
    }

    //ColorClothMap
    public class ColorClothMap : EntityTypeConfiguration<ColorCloth>
    {
        public ColorClothMap()
        {
            this.ToTable("ColorCloth");
            this.HasKey(t => t.ColorId);

            this.Property(t => t.ColorId).HasColumnName("ColorId");
            this.Property(t => t.ColorName).HasColumnName("ColorName");
        }
    }

    //MaterialClothMap
    public class MaterialClothMap : EntityTypeConfiguration<MaterialCloth>
    {
        public MaterialClothMap()
        {
            this.ToTable("MaterialCloth");
            this.HasKey(t => t.MatId);

            this.Property(t => t.MatId).HasColumnName("MatId");
            this.Property(t => t.MaterialType).HasColumnName("MaterialType");
        }
    }

    //OccasionClothMap
    public class OccasionClothMap : EntityTypeConfiguration<OccasionCloth>
    {
        public OccasionClothMap()
        {
            this.ToTable("OccasionCloth");
            this.HasKey(t => t.OccasionId);

            this.Property(t => t.OccasionId).HasColumnName("OccasionId");
            this.Property(t => t.OccasionType).HasColumnName("OccasionType");
        }
    }

    //DashboardCloth
    public class DashboardClothMap : EntityTypeConfiguration<DashboardCloth>
    {
        public DashboardClothMap()
        {
            this.ToTable("DashboardCloth");
            this.HasKey(t => t.ItemId);

            this.Property(t => t.ItemId).HasColumnName("ItemId");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.Size).HasColumnName("Size");
            this.Property(t => t.Brand).HasColumnName("Brand");
            this.Property(t => t.Color).HasColumnName("Color");
            this.Property(t => t.Sleeves).HasColumnName("Sleeves");
            this.Property(t => t.Fit).HasColumnName("Fit");
            this.Property(t => t.Material).HasColumnName("Material");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.Occasion).HasColumnName("Occasion");
            this.Property(t => t.FilePath).HasColumnName("FilePath");
            this.Property(t => t.FileName).HasColumnName("FileName");
            this.Property(t => t.NeckType).HasColumnName("NeckType");
            this.Property(t => t.ProdId).HasColumnName("ProdId");
            this.Property(t => t.ProductCost).HasColumnName("ProductCost");
            this.Property(t => t.IsDiscountAvail).HasColumnName("IsDiscountAvail");
            this.Property(t => t.DiscountPercent).HasColumnName("DiscountPercent");
            this.Property(t => t.AfterDiscountCost).HasColumnName("AfterDiscountCost");
            this.Property(t => t.ProductCount).HasColumnName("ProductCount");
            this.Property(t => t.ProductDescription).HasColumnName("ProductDescription");
            this.Property(t => t.Seller).HasColumnName("Seller");
            this.Property(t => t.SellerId).HasColumnName("SellerId");
            this.Property(t => t.ShippingCharges).HasColumnName("ShippingCharges");
            this.Property(t => t.Weight).HasColumnName("Weight");

        }
    }

    //DashboardCloth
    public class DashBoardClothImagesMap : EntityTypeConfiguration<DashBoardClothImages>
    {
        public DashBoardClothImagesMap()
        {
            this.ToTable("DashBoardClothImages");
            this.HasKey(t => t.ItemImgId);

            this.Property(t => t.ItemImgId).HasColumnName("ItemImgId");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.FilePath).HasColumnName("FilePath");
            this.Property(t => t.FileName).HasColumnName("FileName");
            this.Property(t => t.ItemId).HasColumnName("ItemId");
        }
    }

    //DelivaryAvailables
    public class DelivaryAvailsMap : EntityTypeConfiguration<DelivaryAvails>
    {
        public DelivaryAvailsMap()
        {
            this.ToTable("DelivaryAvails");
            this.HasKey(t => t.PinCode);

            this.Property(t => t.PinCode).HasColumnName("PinCode");
            this.Property(t => t.Area).HasColumnName("Area");
            this.Property(t => t.District).HasColumnName("District");
            this.Property(t => t.ShippingCharges).HasColumnName("ShippingCharges");
            this.Property(t => t.COD).HasColumnName("COD");
            this.Property(t => t.PinId).HasColumnName("PinId");
        }
    }
}
