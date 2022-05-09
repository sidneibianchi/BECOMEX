using Newtonsoft.Json;

namespace Api.Domain.Entities
{
    public class Flags
    {
        [JsonProperty("png")]
        public string Flag { get; set; }
    }
}