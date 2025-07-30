const topics = [
  { 
    title: "Stack", 
    pdf: "assets/Stack.pdf", 
    img: "assets/stack.png",
    code: `// Stack example in C\n#include <stdio.h>\n#define MAX 10\nint stack[MAX], top = -1;\n\nvoid push(int x) {\n  if(top == MAX - 1) {\n    printf("Stack Overflow\\n");\n  } else {\n    stack[++top] = x;\n  }\n}`
  },
  { 
    title: "Queue", 
    pdf: "assets/Queue.pdf", 
    img: "assets/queue.png",
    code: `// Queue example in C\n#include <stdio.h>\n#define MAX 10\nint queue[MAX], front = 0, rear = -1;\n\nvoid enqueue(int x) {\n  if(rear == MAX - 1) {\n    printf("Queue Full\\n");\n  } else {\n    queue[++rear] = x;\n  }\n}`
  },
  
  { 
    title: "Linked List", 
    pdf: "assets/LinkedList.pdf", 
    img: "assets/linkedlist.png",
    code: `// Simple Linked List Node\nstruct Node {\n  int data;\n  struct Node* next;\n};`
  },
  { 
    title: "Tree", 
    pdf: "assets/Tree.pdf", 
    img: "assets/tree.png",
    code: `// Binary Tree Node\nstruct Node {\n  int data;\n  struct Node* left;\n  struct Node* right;\n};`
  },
  { 
    title: "Graph", 
    pdf: "assets/Graph.pdf", 
    img: "assets/graph.png",
    code: `// Graph adjacency matrix\nint graph[5][5];\n// Initialize with 0 or 1`
  }
];

const container = document.querySelector('.card-grid');
const searchInput = document.getElementById('searchInput');

const codeModal = new bootstrap.Modal(document.getElementById('codeModal'));
const codeModalContent = document.getElementById("codeModalContent");
const copyCodeBtn = document.getElementById("copyCodeBtn");

function renderCards(filter = '') {
  container.innerHTML = '';
  topics
    .filter(t => t.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(topic => {
      const card = document.createElement('div');
      card.className = 'col-md-2 mb-3';
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${topic.img}" class="card-img-top" alt="${topic.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${topic.title}</h5>
            <div class="btn-group mt-auto" role="group">
              <a href="${topic.pdf}" target="_blank" class="btn btn-outline-info btn-sm">View PDF</a>
              <a href="${topic.pdf}" download class="btn btn-outline-light btn-sm">Download PDF</a>
              <button class="btn btn-primary btn-sm launch-code-btn">Launch Code</button>
            </div>
          </div>
        </div>`;
      
      // Launch Code button click event
      card.querySelector('.launch-code-btn').addEventListener('click', () => {
        codeModalContent.textContent = topic.code || "No code available for this topic.";
        codeModal.show();
      });

      container.appendChild(card);
    });
}

searchInput.addEventListener('input', e => renderCards(e.target.value));

copyCodeBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(codeModalContent.textContent).then(() => {
    alert('Your code is copied successfully!');
  }).catch(() => {
    alert('Failed to copy code!');
  });
});

document.addEventListener('DOMContentLoaded', () => renderCards());
