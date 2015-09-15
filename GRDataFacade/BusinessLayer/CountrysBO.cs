using GRDataFacade.Interface;
using GRDataLayer.Contract;
using GRDataLayer.Repository;
using GRDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataFacade.BusinessLayer
{
    public class CountrysBO : ICountrysBO
    {
        #region Unitof work Ref
        IUnitOfWork _unitOfWork = null;

        public CountrysBO(IUnitOfWork GRDBContext)
        {
            this._unitOfWork = GRDBContext;
        }

        public CountrysBO()
        {
            this._unitOfWork = new UnitOfWork();
        }
        #endregion Unitof work Ref

        //GetCountrys
        public List<Countrys> GetCountrys()
        {
            var data = _unitOfWork.Repository<Countrys>().GetAll().ToList();
            return data;
        }

        //GetStates
        public List<States> GetStates(int Countryid)
        {
            return _unitOfWork.Repository<States>().GetAll().ToList();

        }

        //GetProductTypes
        public List<ProductTypes> GetProductTypes()
        {
            return _unitOfWork.Repository<ProductTypes>().GetAll().ToList();
        }

        //ClothBrand
        public List<ClothBrands> GetClothBrands()
        {
            return _unitOfWork.Repository<ClothBrands>().GetAll().ToList();
        }

        //ClothCategory
        public List<ClothCategory> GetClothCategory()
        {

            return _unitOfWork.Repository<ClothCategory>().GetAll().ToList();
        }

        //FootwaresCategory
        public List<FootWaresCategory> GetFootWareCategory()
        {
            return _unitOfWork.Repository<FootWaresCategory>().GetAll().ToList();
        }

        //ClothColor
        public List<ClothColor> GetClothColor()
        {
            return _unitOfWork.Repository<ClothColor>().GetAll().ToList();
        }

        //ClothNeckType
        public List<ClothNeckTypes> GetClothNeckType()
        {
            return _unitOfWork.Repository<ClothNeckTypes>().GetAll().ToList();
        }

        //ClothSleves
        public List<ClothSleeves> GetClothSleeves()
        {
            return _unitOfWork.Repository<ClothSleeves>().GetAll().ToList();
        }

        //ClothFit
        public List<ClothFit> GetClothFit()
        {
            return _unitOfWork.Repository<ClothFit>().GetAll().ToList();
        }

        //ClothSize
        public List<ClothSize> GetClothSize()
        {
            return _unitOfWork.Repository<ClothSize>().GetAll().ToList();
        }

        //ClothMaterial
        public List<ClothMaterials> GetClothMaterial()
        {
            return _unitOfWork.Repository<ClothMaterials>().GetAll().ToList();
        }

        //ClothOccasion
        public List<ClothOccasion> GetClothOccasion()
        {
            return _unitOfWork.Repository<ClothOccasion>().GetAll().ToList();
        }
    }
}
