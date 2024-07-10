export async function loadResource<T>(resource: string, locale?: string) {
    const resourceFile = '/resource/' + resource + '_' + locale + '.json';
    const response = await fetch(resourceFile);
    return await response.json() as T;
}
