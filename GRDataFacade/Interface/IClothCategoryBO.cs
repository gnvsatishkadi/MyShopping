using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataModel;
namespace GRDataFacade.Interface
{
    public interface IClothCategoryBO
    {
        //SizeCloth
        List<SizeCloth> GetSizeClothProducts();

        //BrandCloth
        List<BrandCloth> GetBrandClothProducts();

        //NecktypeCloth
        List<NecktypeCloth> GetNecktypeClothProducts();

        //SleevesCloth
        List<SleevesCloth> GetSleevesClothProducts();

        //FitCloth
        List<FitCloth> GetFitClothProducts();

        //MaterialCloth
        List<MaterialCloth> GetMaterialClothProducts();

        //OccasionCloth
        List<OccasionCloth> GetOccasionClothProducts();

        //ColorCloth
        List<ColorCloth> GetColorClothProducts();


        //AvailableDashboardCloth
        List<DashboardCloth> AvailableDashboardCloth();

        //DashBoardClothImages
        List<DashBoardClothImages> DashBoardClothImages();

        //InsertNewProduct
        void NewDashBoardProduct(DashboardCloth dashboard);

        //CheckPincodeAvails
        DelivaryAvails CheckPincodeAvailOrNot(int Pincode);

        /// <summary>
        /// Checking Product Count is available in store or not
        /// </summary>
        /// <param name="Count"></param>
        /// <returns></returns>
        DashboardCloth CheckProductCount(int ItemId);
    }
}
