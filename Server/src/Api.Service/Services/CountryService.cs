using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace Api.Service.Services
{
    public class CountryService : ICountryService
    {

        private readonly IMemoryCache _memoryCache;
        private const string COUNTRIES_KEY = "Countries";

        public CountryService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public async Task<List<Country>> GetAll()
        {
            try
            {
                if (_memoryCache.TryGetValue(COUNTRIES_KEY, out List<Country> countriesObject))
                {
                    return (countriesObject);
                }
                else
                {
                    const string restCountriesUrl = "https://restcountries.com/v2/all";

                    using (var httpClient = new HttpClient())
                    {
                        var response = await httpClient.GetAsync(restCountriesUrl);

                        var responseData = await response.Content.ReadAsStringAsync();

                        var countries = JsonConvert.DeserializeObject<List<Country>>(responseData);

                        var memoryCacheEntryOptions = new MemoryCacheEntryOptions
                        {
                            AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(60),
                            SlidingExpiration = TimeSpan.FromSeconds(20)
                        };

                        _memoryCache.Set(COUNTRIES_KEY, countries, memoryCacheEntryOptions);

                        return (countries);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            } 
        }

    }
}