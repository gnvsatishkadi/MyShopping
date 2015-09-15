using System.Data.Entity.ModelConfiguration;
using GRDataModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace GRDataLayer.Mappers
{
    //countrys
    public class CountrysMap : EntityTypeConfiguration<Countrys>
    {
        public CountrysMap()
        {
            this.ToTable("Countrys");
            this.Property(t => t.CountrysId).HasColumnName("CountrysId");
            this.Property(t => t.CountryName).HasColumnName("CountryName");
        }
    }

    //states
    public class StatesMap : EntityTypeConfiguration<States>
    {
        public StatesMap()
        {
            this.ToTable("States");
            this.Property(t => t.StatesId).HasColumnName("StatesId");
            this.Property(t => t.CountrysId).HasColumnName("CountrysId");
            this.Property(t => t.StateName).HasColumnName("StateName");
        }
    }

    //ClothProductType Mapping
    public class ProductTypeMap : EntityTypeConfiguration<ProductTypes>
    {
        public ProductTypeMap()
        {
            this.ToTable("ProductType");

            this.HasKey(t => t.ProdId);

            this.Property(t => t.ProdId).HasColumnName("ProdId").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(t => t.ProdType).HasColumnName("ProdType");
        }
    }

    //ClothBrand
    public class ClothBrandMap : EntityTypeConfiguration<ClothBrands>
    {
        public ClothBrandMap()
        {
            this.ToTable("ClothBrands");

            this.HasKey(t => t.BrandId);

            this.Property(t => t.BrandId).HasColumnName("BrandId");
            this.Property(t => t.BrandName).HasColumnName("BrandName");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.BrandRefId).HasColumnName("BrandRefId");

        }
    }

    //ClothCategory
    public class ClothCategoryMap : EntityTypeConfiguration<ClothCategory>
    {
        public ClothCategoryMap()
        {
            this.ToTable("ClothCategory");

            this.HasKey(t => t.CategoryId);

            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.Gender).HasColumnName("Gender");
            this.Property(t => t.Category).HasColumnName("Category");
            this.Property(t => t.ProdID).HasColumnName("ProdID");

        }
    }

    //FootWaresCategory
    public class FootWaresCategoryMap : EntityTypeConfiguration<FootWaresCategory>
    {
        public FootWaresCategoryMap()
        {
            this.ToTable("FootWaresCategory");

            this.HasKey(t => t.CategoryId);

            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.Gender).HasColumnName("Gender");
            this.Property(t => t.Category).HasColumnName("Category");
            this.Property(t => t.ProdID).HasColumnName("ProdID");
        }
    }

    //ClothFit
    public class ClothFitMap : EntityTypeConfiguration<ClothFit>
    {
        public ClothFitMap()
        {
            this.ToTable("ClothFit");

            this.HasKey(t => t.FitId);

            this.Property(t => t.FitId).HasColumnName("FitId");
            this.Property(t => t.FitType).HasColumnName("FitType");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.FitRefId).HasColumnName("FitRefId");
        }
    }

    //ClothMaterial
    public class ClothMaterialMap : EntityTypeConfiguration<ClothMaterials>
    {
        public ClothMaterialMap()
        {
            this.ToTable("ClothMaterials");

            this.HasKey(t => t.MatId);

            this.Property(t => t.MatId).HasColumnName("MatId");
            this.Property(t => t.MaterialType).HasColumnName("MaterialType");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.MatRefId).HasColumnName("MatRefId");

        }
    }

    //ClothNeckType
    public class ClothNeckTypesMap : EntityTypeConfiguration<ClothNeckTypes>
    {
        public ClothNeckTypesMap()
        {
            this.ToTable("ClothNeckTypes");

            this.HasKey(t => t.NeckTypeId);

            this.Property(t => t.NeckTypeId).HasColumnName("NeckTypeId");
            this.Property(t => t.NeckType).HasColumnName("NeckType");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.ProdId).HasColumnName("ProdId");
            this.Property(t => t.NeckTypeRefId).HasColumnName("NeckTypeRefId");
        }
    }

    //ClothSleves
    public class ClothSleevesMap : EntityTypeConfiguration<ClothSleeves>
    {
        public ClothSleevesMap()
        {
            this.ToTable("ClothSleeves");

            this.HasKey(t => t.SlevesId);

            this.Property(t => t.SlevesId).HasColumnName("SlevesId");
            this.Property(t => t.SlevesType).HasColumnName("SlevesType");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.ProdId).HasColumnName("ProdId");
            this.Property(t => t.SlevesRefId).HasColumnName("SlevesRefId");

        }
    }

    //ClothSize
    public class ClothSizeMap : EntityTypeConfiguration<ClothSize>
    {
        public ClothSizeMap()
        {
            this.ToTable("ClothSize");

            this.HasKey(t => t.SizeId);

            this.Property(t => t.SizeId).HasColumnName("SizeId");
            this.Property(t => t.Size).HasColumnName("Size");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.SizeRefId).HasColumnName("SizeRefId");
        }
    }

    //ClothColor
    public class ClothColorMap : EntityTypeConfiguration<ClothColor>
    {
        public ClothColorMap()
        {
            this.ToTable("ClothColor");

            this.HasKey(t => t.ColorId);

            this.Property(t => t.ColorName).HasColumnName("ColorName");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.ColorRefId).HasColumnName("ColorRefId");
        }
    }

    //ClothOccasion
    public class ClothOccasionMap : EntityTypeConfiguration<ClothOccasion>
    {
        public ClothOccasionMap()
        {
            this.ToTable("ClothOccasion");

            this.HasKey(t => t.OccasionId);

            this.Property(t => t.OccasionId).HasColumnName("OccasionId");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.OccasionRefId).HasColumnName("OccasionRefId");
        }
    }
}
