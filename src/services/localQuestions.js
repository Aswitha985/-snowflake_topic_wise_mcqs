const localQuestions = [
  // Operators
  { id: 'op1', question: 'What is the output of 2 ** 3?', options: ['6', '8', '9', '5'], answer: '8', topic: 'Operators' },
  { id: 'op2', question: 'What does // operator do?', options: ['Addition', 'Floor division', 'Modulo', 'Power'], answer: 'Floor division', topic: 'Operators' },
  { id: 'op3', question: 'Result of 10 % 3?', options: ['3', '1', '0', '3.33'], answer: '1', topic: 'Operators' },
  { id: 'op4', question: 'What is += ?', options: ['Assignment', 'Addition assignment', 'Comparison', 'Logical'], answer: 'Addition assignment', topic: 'Operators' },
  { id: 'op5', question: 'Output of \\"a\\" + \\"b\\"?', options: ['ab', 'Error', 'a b', 'ab (space)'], answer: 'ab', topic: 'Operators' },
  { id: 'op6', question: 'What is == ?', options: ['Assignment', 'Equality', 'Identity', 'Greater'], answer: 'Equality', topic: 'Operators' },
  { id: 'op7', question: 'Logical AND is?', options: ['and', '&&', '|', '&'], answer: 'and', topic: 'Operators' },
  { id: 'op8', question: 'What is not in Python?', options: ['!', 'not', '~', 'no'], answer: 'not', topic: 'Operators' },
  { id: 'op9', question: 'Bitwise OR is?', options: ['or', '||', '|', '|| |'], answer: '|', topic: 'Operators' },
  { id: 'op10', question: 'What is in operator for?', options: ['Membership', 'Identity', 'Assignment', 'Loop'], answer: 'Membership', topic: 'Operators' },

  // Functions
  { id: 'fn1', question: 'Keyword to define function?', options: ['func', 'define', 'def', 'function'], answer: 'def', topic: 'Functions' },
  { id: 'fn2', question: 'What does len() return?', options: ['Length', 'Type', 'Max', 'Min'], answer: 'Length', topic: 'Functions' },
  { id: 'fn3', question: 'Default parameter syntax?', options: ['param= value', 'param : value', '(param=value)', '*param'], answer: 'param= value', topic: 'Functions' },
  { id: 'fn4', question: 'Return keyword?', options: ['return', 'ret', 'exit', 'end'], answer: 'return', topic: 'Functions' },
  { id: 'fn5', question: 'Lambda is?', options: ['Anonymous function', 'Class', 'Loop', 'List'], answer: 'Anonymous function', topic: 'Functions' },
  { id: 'fn6', question: 'What is *args?', options: ['Variable args', 'Pointer', 'Multiply', 'Star'], answer: 'Variable args', topic: 'Functions' },
  { id: 'fn7', question: 'Global keyword for?', options: ['Global variable', 'Local', 'Import', 'Module'], answer: 'Global variable', topic: 'Functions' },
  { id: 'fn8', question: 'Recursive function calls?', options: ['Itself', 'Other', 'Class', 'Never'], answer: 'Itself', topic: 'Functions' },
  { id: 'fn9', question: 'map() takes?', options: ['Function and iterable', 'List', 'Number', 'String'], answer: 'Function and iterable', topic: 'Functions' },
  { id: 'fn10', question: 'filter() does?', options: ['Filter true', 'Sort', 'Map', 'Reduce'], answer: 'Filter true', topic: 'Functions' },

  // Syntax
  { id: 'syn1', question: 'Python file extension?', options: ['.pt', '.py', '.pyt', '.python'], answer: '.py', topic: 'Syntax' },
  { id: 'syn2', question: 'Comment symbol?', options: ['//', '#', '--', '/* */'], answer: '#', topic: 'Syntax' },
  { id: 'syn3', question: 'Indentation uses?', options: ['Tabs/spaces', 'Braces', 'Semicolons', 'Newlines'], answer: 'Tabs/spaces', topic: 'Syntax' },
  { id: 'syn4', question: 'String literal?', options: ['\\"', "\\'", '[]', '{}'], answer: "\\'", topic: 'Syntax' },
  { id: 'syn5', question: 'If statement ends with?', options: [';', 'end', 'nothing', ':'], answer: ':', topic: 'Syntax' },
  { id: 'syn6', question: 'List syntax?', options: ['{}', '[]', '()', '{}[]'], answer: '[]', topic: 'Syntax' },
  { id: 'syn7', question: 'Multi-line string?', options: ['\\"\\"\\"', '/* */', '//', '# #'], answer: '"""', topic: 'Syntax' },
  { id: 'syn8', question: 'No {} for blocks?', options: ['True', 'False', 'Error', 'Optional'], answer: 'True', topic: 'Syntax' },
  { id: 'syn9', question: 'Case sensitive?', options: ['No', 'Yes', 'Optional', 'Never'], answer: 'Yes', topic: 'Syntax' },
  { id: 'syn10', question: 'Pass keyword?', options: ['Placeholder', 'Skip', 'Return', 'Break'], answer: 'Placeholder', topic: 'Syntax' },

  // Data Types
  { id: 'dt1', question: 'True/False type?', options: ['int', 'str', 'bool', 'float'], answer: 'bool', topic: 'Data Types' },

  { id: 'dt3', question: 'str(123)?', options: ['123', '\\"123\\"', 'error', '123.0'], answer: '\\"123\\"', topic: 'Data Types' },
  { id: 'dt4', question: 'List is mutable?', options: ['No', 'Yes', 'Sometimes', 'No'], answer: 'Yes', topic: 'Data Types' },
  { id: 'dt5', question: 'Tuple is?', options: ['Mutable', 'Immutable', 'List', 'Dict'], answer: 'Immutable', topic: 'Data Types' },
  { id: 'dt6', question: 'None type?', options: ['null', 'None', 'nil', '0'], answer: 'None', topic: 'Data Types' },
  { id: 'dt7', question: 'int can be?', options: ['Unlimited size', '32 bit', '64 bit', 'Fixed'], answer: 'Unlimited size', topic: 'Data Types' },
  { id: 'dt8', question: 'float has?', options: ['Decimal', 'No decimal', 'String', 'Bool'], answer: 'Decimal', topic: 'Data Types' },
  { id: 'dt9', question: 'set syntax?', options: ['{}', '[]', '()', '{1,2}'], answer: '{1,2}', topic: 'Data Types' },
  { id: 'dt10', question: 'dict key must be?', options: ['Immutable', 'Mutable', 'List', 'Any'], answer: 'Immutable', topic: 'Data Types' },

  // Input/Output
  { id: 'io1', question: 'Input function?', options: ['get()', 'input()', 'scan()', 'read()'], answer: 'input()', topic: 'Input/Output' },
  { id: 'io2', question: 'Print output to?', options: ['File', 'Console', 'Variable', 'Screen'], answer: 'Console', topic: 'Input/Output' },
  { id: 'io3', question: 'print(1,2,3) uses?', options: ['Comma', '+', 'str()', 'join'], answer: 'Comma', topic: 'Input/Output' },
  { id: 'io4', question: 'input() returns?', options: ['int', 'str', 'float', 'list'], answer: 'str', topic: 'Input/Output' },
  { id: 'io5', question: 'File open mode read?', options: ['w', 'r', 'a', 'x'], answer: 'r', topic: 'Input/Output' },
  { id: 'io6', question: 'write() for files?', options: ['Read', 'Write', 'Append', 'All'], answer: 'Write', topic: 'Input/Output' },
  { id: 'io7', question: 'with open() context?', options: ['Auto close', 'Manual close', 'Error', 'Optional'], answer: 'Auto close', topic: 'Input/Output' },
  { id: 'io8', question: 'sep in print()?', options: ['Space default', 'Comma', 'Newline', 'Tab'], answer: 'Space default', topic: 'Input/Output' },
  { id: 'io9', question: 'end=\\'' in print?', options: ['No newline', 'Newline', 'Space', 'Tab'], answer: 'No newline', topic: 'Input/Output' },
  { id: 'io10', question: 'int(input()) does?', options: ['Convert to int', 'String', 'Float', 'Error if not num'], answer: 'Convert to int', topic: 'Input/Output' },

  // Data Structures
  { id: 'ds1', question: 'List is?', options: ['Ordered collection', 'Unordered', 'Key-value', 'Set'], answer: 'Ordered collection', topic: 'Data Structures' },
  { id: 'ds2', question: 'Dict syntax?', options: ['{}', '[]', '()', 'set{}'], answer: '{}', topic: 'Data Structures' },
  { id: 'ds3', question: 'list.append() adds?', options: ['End', 'Beginning', 'Middle', 'Replace'], answer: 'End', topic: 'Data Structures' },
  { id: 'ds4', question: 'dict.get(key, default)?', options: ['Safe access', 'Delete', 'Add', 'Update'], answer: 'Safe access', topic: 'Data Structures' },
  { id: 'ds5', question: 'set has unique?', options: ['Duplicates', 'Unique', 'Ordered', 'Indexed'], answer: 'Unique', topic: 'Data Structures' },
  { id: 'ds6', question: 'list.pop() removes?', options: ['Last', 'First', 'Random', 'None'], answer: 'Last', topic: 'Data Structures' },
  { id: 'ds7', question: 'tuple[0] access?', options: ['Mutable', 'Immutable but indexable', 'Error', 'Key'], answer: 'Immutable but indexable', topic: 'Data Structures' },
  { id: 'ds8', question: 'list slicing [1:3]?', options: ['Index 1 to 2', '1 to 3', '3 to 1', 'Copy'], answer: 'Index 1 to 2', topic: 'Data Structures' },
  { id: 'ds9', question: 'dict.keys() returns?', options: ['Values', 'Keys view', 'Items', 'Length'], answer: 'Keys view', topic: 'Data Structures' },
  { id: 'ds10', question: 'collections.deque for?', options: ['Fast append/pop ends', 'Stack', 'Queue', 'List'], answer: 'Fast append/pop ends', topic: 'Data Structures' },

  // Loops
  { id: 'lp1', question: 'For loop syntax?', options: ['for i in range:', 'for (i=0; i<10; i++)', 'loop i:', 'while i:' ], answer: 'for i in range:', topic: 'Loops' },
  { id: 'lp2', question: 'While loop condition?', options: ['True', 'False', 'Break', 'Continue'], answer: 'True', topic: 'Loops' },
  { id: 'lp3', question: 'range(5) is 0 to?', options: ['4', '5', '6', '0-5'], answer: '4', topic: 'Loops' },
  { id: 'lp4', question: 'break does?', options: ['Exit loop', 'Skip iteration', 'Continue', 'Restart'], answer: 'Exit loop', topic: 'Loops' },
  { id: 'lp5', question: 'continue does?', options: ['Skip rest iteration', 'Exit', 'Break', 'Pass'], answer: 'Skip rest iteration', topic: 'Loops' },
  { id: 'lp6', question: 'for else executes?', options: ['If no break', 'Always', 'Never', 'Error'], answer: 'If no break', topic: 'Loops' },
  { id: 'lp7', question: 'Nested loops?', options: ['Yes', 'No', 'Limited', 'Error'], answer: 'Yes', topic: 'Loops' },
  { id: 'lp8', question: 'enumerate() in loop for?', options: ['Index and value', 'Only value', 'Key', 'Range'], answer: 'Index and value', topic: 'Loops' },
  { id: 'lp9', question: 'while True: needs?', options: ['break', 'pass', 'continue', 'All'], answer: 'break', topic: 'Loops' },
  { id: 'lp10', question: 'zip() in loops for?', options: ['Pair iterables', 'Single', 'Unzip', 'Range'], answer: 'Pair iterables', topic: 'Loops' }
];

export default localQuestions;

