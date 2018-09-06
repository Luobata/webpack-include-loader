import compiler from './index.js';

test('Include common test', async () => {
    const stats = await compiler('test.md');
    const output = stats.toJson().modules[0].source;

    // expect(output).toBe('export default "Hey Alice!\\n"');
    expect(output).toBe(
        '"### Introduce\\n\\nwebpack include loader\\n\\n### title\\n\\n123\\n\\n"',
    );
});
