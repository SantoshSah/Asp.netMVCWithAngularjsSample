﻿using AspNetMvcSample.Core.Data;
using AspNetMvcSample.Core.Data.Repositories;
using AspNetMvcSample.Core.Entities;
using AspNetMvcSample.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Services.Services
{
   public class BaseService<TEntity> : IService<TEntity> where TEntity : BaseEntity    
    {
        public IUnitOfWork _unitOfWork { get; private set; }
        private readonly IRepository<TEntity> _repository;
        private bool _disposed;

        public BaseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.Repository<TEntity>();
        }

        public TEntity Add(TEntity entity)
        {
            _repository.Add(entity);
            _unitOfWork.Commit();

            return entity;
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            _repository.Add(entity);
            await _unitOfWork.CommitAsync();

            return entity;
        }

        public void Update(TEntity entity)
        {
            _repository.Update(entity);
            _unitOfWork.Commit();
        }

        public void Delete(TEntity entity)
        {
            _repository.Delete(entity);
            _unitOfWork.Commit();
        }

        public Task<List<TEntity>> GetAllAsync()
        {
            return _repository.GetAllAsync();
        }
        public List<TEntity> GetAll()
        {
            return _repository.GetAll();
        }
        public Task<TEntity> GetByIdAsync(int id)
        {
            return _repository.GetByIdAsync(id);
        }

        public TEntity GetById(int id)
        {
            return _repository.GetById(id);
        }
        public Task UpdateAsync(TEntity entity)
        {
            _repository.Update(entity);
            return _unitOfWork.CommitAsync();
        }

        public Task DeleteAsync(TEntity entity)
        {
            _repository.Delete(entity);
            return _unitOfWork.CommitAsync();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _unitOfWork.Dispose();
            }
            _disposed = true;
        }
    }
}
