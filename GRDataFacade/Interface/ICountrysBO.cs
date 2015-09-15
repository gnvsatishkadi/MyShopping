using GRDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace GRDataFacade.Interface
{
    public interface ICountrysBO
    {
        //Countrys
        List<Countrys> GetCountrys();

        //States
        List<States> GetStates(int Countryid);

        //ProductTypes
        List<ProductTypes> GetProductTypes();

        //ClothBrand
        List<ClothBrands> GetClothBrands();

        //ClothCategory
        List<ClothCategory> GetClothCategory();

        //FootWaresCategory
        List<FootWaresCategory> GetFootWareCategory();

        //ClothColor
        List<ClothColor> GetClothColor();

        //ClothNeckType
        List<ClothNeckTypes> GetClothNeckType();

        //ClothSleves
        List<ClothSleeves> GetClothSleeves();

        //ClothFit
        List<ClothFit> GetClothFit();

        //ClothSize
        List<ClothSize> GetClothSize();

        //ClothMaterial
        List<ClothMaterials> GetClothMaterial();

        //ClothOccasion
        List<ClothOccasion> GetClothOccasion();


    }
}
