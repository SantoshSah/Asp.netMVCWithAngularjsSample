using AspNetMvcSample.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core.Services
{
  public  interface IService<TEntity> : IDisposable where TEntity : BaseEntity
    {
        Task<List<TEntity>> GetAllAsync();

        List<TEntity> GetAll();
        Task<TEntity> GetByIdAsync(int id);
        TEntity GetById(int id);

        TEntity Add(TEntity entity);

        Task<TEntity> AddAsync(TEntity entity);

        void Update(TEntity entity);

        Task UpdateAsync(TEntity entity);

        void Delete(TEntity entity);

        Task DeleteAsync(TEntity entity);
    }
}
