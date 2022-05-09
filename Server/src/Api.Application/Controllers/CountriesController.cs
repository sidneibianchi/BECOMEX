using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace Api.Application.Controllers
{
    [Route("api/[controller]")]
    public class CountriesController : ControllerBase
    {
        #region Cache em memória

        private readonly ICountryService _service;

        public CountriesController(ICountryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetCountries()
        {
            return Ok(await _service.GetAll()); 
        }
     
        #endregion
    }
}