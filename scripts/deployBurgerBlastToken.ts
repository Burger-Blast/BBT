import { toNano } from '@ton/core';
import { BurgerBlastToken } from '../wrappers/BurgerBlastToken';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const burgerBlastToken = provider.open(
        BurgerBlastToken.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('BurgerBlastToken')
        )
    );

    await burgerBlastToken.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(burgerBlastToken.address);

    console.log('ID', await burgerBlastToken.getID());
}
