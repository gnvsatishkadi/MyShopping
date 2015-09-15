using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataModel
{
    //Countrys
    public class Countrys
    {
        public int CountrysId { get; set; }
        public string CountryName { get; set; }
    }

    //States
    public class States
    {
        public int StatesId { get; set; }
        public string StateName { get; set; }
        public int CountrysId { get; set; }
        public virtual Countrys countrys { get; set; }
    }

    //ProductTypes
    public class ProductTypes
    {
        public int ProdId { get; set; }
        public string ProdType { get; set; }
    }

    //ClothBrand
    public class ClothBrands
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public int CategoryId { get; set; }
        public int BrandRefId { get; set; }
    }

    //ClothCategory
    public class ClothCategory
    {
        public int CategoryId { get; set; }
        public string Gender { get; set; }
        public string Category { get; set; }
        public int ProdID { get; set; }
    }

    //FootWaresCategory
    public class FootWaresCategory
    {
        public int CategoryId { get; set; }
        public string Gender { get; set; }
        public string Category { get; set; }
        public int ProdID { get; set; }
    }

    //NeckType
    public class ClothNeckTypes
    {
        public int NeckTypeId { get; set; }
        public string NeckType { get; set; }
        public int CategoryId { get; set; }
        public int ProdId { get; set; }
        public int NeckTypeRefId { get; set; }
    }

    //ClothSleves
    public class ClothSleeves
    {
        public int SlevesId { get; set; }
        public string SlevesType { get; set; }
        public int CategoryId { get; set; }
        public int ProdId { get; set; }
        public int SlevesRefId { get; set; }
    }

    //ClothFit
    public class ClothFit
    {
        public int FitId { get; set; }
        public string FitType { get; set; }
        public int CategoryId { get; set; }
        public int FitRefId { get; set; }
    }

    //ClothSize
    public class ClothSize
    {
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int CategoryId { get; set; }
        public int SizeRefId { get; set; }
    }

    //ClothColor
    public class ClothColor
    {
        public int ColorId { get; set; }
        public string ColorName { get; set; }
        public int CategoryId { get; set; }
        public int ColorRefId { get; set; }
    }

    //ClothMaterials
    public class ClothMaterials
    {
        public int MatId { get; set; }
        public string MaterialType { get; set; }
        public int CategoryId { get; set; }
        public int MatRefId { get; set; }
    }

    //ClothOccasion
    public class ClothOccasion
    {
        public int OccasionId { get; set; }
        public int CategoryId { get; set; }
        public int OccasionRefId { get; set; }
    }

}
