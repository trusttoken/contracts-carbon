import { defaultAccounts } from 'ethereum-waffle'
import ganache from 'ganache'
import { providers, Wallet, utils, constants } from 'ethers'

const PORT = 8545

export async function startGanache() {
  const server = ganache.server({
    accounts: defaultAccounts,
    gasLimit: 15_000_000,
    logging: {
      quiet: true,
    },
  })
  server.listen(PORT, '0.0.0.0')
  console.log(`Ganache started at: localhost:${PORT}`)
  console.log('Available accounts')
  console.log('Address\t\t\t\t\t   Private key\t\t\t\t\t\t\t      Balance')
  console.log(defaultAccounts.map(({ balance, secretKey }) => `${new Wallet(secretKey).address} ${secretKey} ${utils.formatEther(balance).toString()}${constants.EtherSymbol}`).join('\n'))

  const provider = new providers.Web3Provider(server.provider as any)
  const network = await provider.getNetwork()
  network.name = 'ganache'

  return provider
}
