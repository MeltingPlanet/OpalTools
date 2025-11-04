import { tool, ParameterType } from '@optimizely-opal/opal-tools-sdk';

// Interfaces for tool parameters
interface AddressDetailsParams {
  query: string;
  countryCode: string;
}

export class AddressTools {
  @tool({
    name: 'address-details',
    description:
      'Fetches address details from Bring API based on query and country code',
    parameters: [
      {
        name: 'query',
        description: 'Query string for address details',
        type: ParameterType.String,
        required: true,
      },
      {
        name: 'countryCode',
        description: 'Country code for the Bring API',
        type: ParameterType.String,
        required: true,
      },
    ],
  })
  async addressDetails({ query, countryCode }: AddressDetailsParams) {
    const headers = {
      Accept: 'application/json',
      'X-Mybring-API-Uid': process.env.API_UID || '',
      'X-Mybring-API-Key': process.env.API_KEY || '',
    };

    const limit = 5;
    const response = await fetch(
      `https://api.bring.com/address/api/${countryCode}/addresses/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      return {
        error: true,
        message: `Bring API returned status ${response.status}`,
      };
    }

    const data = await response.json();
    return data.addresses ?? [];
  }
}
