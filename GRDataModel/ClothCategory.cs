using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataModel
{
    //SizeCloth
    public class SizeCloth
    {
        public int SizeId { get; set; }
        public string Size { get; set; }
    }

    //BrandCloth
    public class BrandCloth
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; }
    }

    //NecktypeCloth
    public class NecktypeCloth
    {
        public int NeckId { get; set; }
        public string NeckType { get; set; }
    }

    //SlevesCloth
    public class SleevesCloth
    {
        public int SlevesId { get; set; }
        public string SlevesType { get; set; }
    }

    //FitCloth
    public class FitCloth
    {
        public int FitId { get; set; }
        public string FitType { get; set; }
    }

    //ClothCloth
    public class ColorCloth
    {
        public int ColorId { get; set; }
        public string ColorName { get; set; }
    }

    //Materialcloth
    public class MaterialCloth
    {
        public int MatId { get; set; }
        public string MaterialType { get; set; }
    }

    //Materialcloth
    public class OccasionCloth
    {
        public int OccasionId { get; set; }
        public string OccasionType { get; set; }
    }

    //DashboardCloth Table

    public class DashboardCloth
    {
        public int ItemId { get; set; }
        public int CategoryId { get; set; }
        public string Size { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public string Sleeves { get; set; }
        public string Fit { get; set; }
        public string Material { get; set; }
        public string Status { get; set; }
        public string Occasion { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public string NeckType { get; set; }
        public int ProdId { get; set; }
        public double ProductCost { get; set; }
        public string IsDiscountAvail { get; set; }
        public int DiscountPercent { get; set; }
        public double AfterDiscountCost { get; set; }
        public int ProductCount { get; set; }
        public string ProductDescription { get; set; }
        public string Seller { get; set; }
        public int SellerId { get; set; }
        public int ShippingCharges { get; set; }
        public int Weight { get; set; }
    }

    //DashBoardClothImages
    public class DashBoardClothImages
    {
        public int ItemImgId { get; set; }
        public int CategoryId { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public int ItemId { get; set; }
    }

    //DelivaryAvailables
    public class DelivaryAvails
    {
        
        public int PinCode { get; set; }
        public string Area { get; set; }
        public string District { get; set; }
        public int ShippingCharges { get; set; }
        public string COD { get; set; }
        public int PinId { get; set; }

    }
}
